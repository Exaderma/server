const request = require('supertest');
const express = require('express');
const app = express();

import { authenticateToken, userAuthenticate } from '../../../src/utils/security/JWTokens';
import { dataManager } from '../../../src/index';
import { HTTP_CODES } from '../../../src/utils/HTTP-codes';

// Mock TypeORM repository and entity
const mockRepository = {
    findOne: jest.fn(),
  };
  const mockEntity = jest.fn();
  
  jest.mock('typeorm', () => ({
    getRepository: () => mockRepository,
  }));
  
  app.use(express.json());
  
  describe('GET /patient/getUserProfile', () => {
    it('should return 400 if id is missing', async () => {
      const response = await request(app)
        .get('/patient/getUserProfile')
        .expect(HTTP_CODES.BAD_REQUEST);
  
      expect(response.text).toContain('incorrect id format');
    });
  
    it('should return 404 if user not found', async () => {
      // Mock the repository behavior to return null when findOne is called
      mockRepository.findOne.mockResolvedValueOnce(null);
  
      const response = await request(app)
        .get('/patient/getUserProfile?id=123')
        .expect(HTTP_CODES.NOT_FOUND);
  
      expect(response.text).toContain('Invalid id');
    });
  
    it('should return user profile when user exists', async () => {
      const mockUser = {
        id: '123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        admin: false,
        roles: ['user'],
      };
  
      // Mock the repository behavior to return the user data
      mockRepository.findOne.mockResolvedValueOnce(mockUser);
      
      const response = await request(app)
        .get('/patient/getUserProfile?id=123')
        .expect(HTTP_CODES.OK);
  
      expect(response.body).toEqual(mockUser);
    });
  
    it('should return 500 if an internal server error occurs', async () => {
      const mockError = new Error('Internal server error');
      
      // Mock the repository behavior to throw an error
      mockRepository.findOne.mockRejectedValueOnce(mockError);
  
      const response = await request(app)
        .get('/patient/getUserProfile?id=123')
        .expect(HTTP_CODES.INTERNAL_SERVER_ERROR);
  
      expect(response.text).toContain('Internal server error');
    });
});

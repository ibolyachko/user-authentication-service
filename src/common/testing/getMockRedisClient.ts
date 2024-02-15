export const getMockRedisClient = () => {
  return {
    get: jest.fn(),
    set: jest.fn(),
  };
};

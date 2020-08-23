import fetchMock from 'jest-fetch-mock'

//for all our jest tests, do not use the actual fetch api, use this mock fetch api instead.
fetchMock.enableMocks()


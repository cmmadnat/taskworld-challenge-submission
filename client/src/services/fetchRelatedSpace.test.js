import service from './fetchRelatedSpace'
describe('fetch realted space service', () => {
  it('should fetch the data correctly for user 1', () => {
    const expected =
      '{"requiredTransferWorkspaces":[{"spaceId":"workspace1","displayName":"Lightning strike","transferableMembers":[{"_id":"user2","name":"Ryan Lynch"},{"_id":"user3","name":"Riker Lynch"},{"_id":"user4","name":"Rydel Lynch"}]},{"spaceId":"workspace2","displayName":"Time machine","transferableMembers":[{"_id":"user5","name":"Edward Bayer","workspaceId":"workspace3"},{"_id":"user6","name":"Eli Brook","workspaceId":"workspace3"}]}],"deleteWorkspaces":[{"spaceId":"workspace3","displayName":"Moon landing"}]}'
    return service('user1').then(data =>
      expect(data).toEqual(JSON.parse(expected))
    )
  })
})

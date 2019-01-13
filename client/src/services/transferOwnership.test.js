import transferOwnership from './transferOwnership'
describe('transfer ownership service', () => {
  it('should check ownership return valid ', () => {
    return transferOwnership({ _id: 'any' }, { _id: 'user3' }, { spaceId: 1 }).then(
      result => {
        expect(result).toEqual('success')
      }
    )
  })
  it('should check ownership and return Conflict', () => {
    return transferOwnership({ _id: 'any' }, { _id: 'user4' }, { spaceId: 1 }).then(
      result => {
        expect(result).toEqual('Conflict')
      }
    )
  })
})

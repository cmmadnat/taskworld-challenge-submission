import {
  getSurveyPayload,
  submitToSurveyMonkeyDeleteAccount,
} from './SurveyService'

describe('survey service', () => {
  it('should generate a correct form object', () => {
    const payload = getSurveyPayload(
      [{ key: 'bugs', value: '' }, { key: 'expensive', value: '' }],
      'sample comment'
    )
    expect(payload).toEqual({
      pages: [
        {
          id: '48414504',
          questions: [
            {
              answers: [
                { choice_id: '1170264113' },
                { choice_id: '1170264119' },
              ],
              id: '162037852',
            },
            { answers: [{ text: 'sample comment' }], id: '164973120' },
          ],
        },
      ],
    })
  })
  it('should send a request successfully', () => {
    submitToSurveyMonkeyDeleteAccount(
      [{ key: 'bugs', value: '' }, { key: 'expensive', value: '' }],
      'sample comment'
    )
  })
})

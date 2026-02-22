import { readmeAction } from './readme';
import {createMockActionContext} from '@backstage/plugin-scaffolder-node-test-utils'

describe('readmeAction', () => {
  it('should call action', async () => {
    const action = readmeAction();

    await expect(action.handler(createMockActionContext({
      input: {
        projectName: 'test',
      },
    }))).resolves.toBeUndefined()
  });

  it('should fail when passing foo', async () => {
    const action = readmeAction();

    await expect(action.handler(createMockActionContext({
      input: {
        projectName: 'foo',
      },
    }))).rejects.toThrow("projectName cannot be 'foo'")
  });
});

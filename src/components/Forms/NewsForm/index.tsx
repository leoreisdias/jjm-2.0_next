import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';

import { Form } from './NewsFormStyle';

export const NewsForm = () => {
  return (
    <NoSsr>
      <Form>
        <TextField
          error={false}
          variant="outlined"
          id="standard-error-helper-text"
          label="Título da Matéria"
          defaultValue="Hello World"
          helperText=""
        />
      </Form>
    </NoSsr>
  );
};

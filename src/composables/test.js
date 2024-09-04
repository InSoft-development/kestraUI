import axios from 'axios';

const executeFlow = async () => {
  const formData = new FormData();
  formData.append('string', 'a string');
  formData.append('optional', 'an optional string');
  formData.append('int', 1);
  formData.append('float', 1.255);
  formData.append('instant', '2023-12-24T23:00:00.000Z');
  formData.append('files', await fetch('/tmp/128M.txt').then(r => r.blob()), 'file');

  const response = await axios.post('/api/v1/executions/example/kestra-inputs', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};


export default executeFlow
import index from './index';

async function handler(req, res) {
  return index(req, res, 1);
}

export default handler;
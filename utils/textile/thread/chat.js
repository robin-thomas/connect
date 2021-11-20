import LRU from 'lru-cache';
import { ThreadID, Query } from '@textile/hub';

import Utils from '../../index';
import Ceramic from '../../ceramic';

class Chat {
  constructor(client, address) {
    this._client = client;
    this._address = address;
    this._collection = process.env.TEXTILE_COLLECTION_CHAT;
    this._threadID = null;

    this._cache = new LRU({
      max: 500,
      maxAge: 60 * 60 * 1000,
    });
  }

  setThreadId(threadID) {
    this._threadID = ThreadID.fromString(threadID);
  }

  async getAll() {
    const threadID = this._threadID.toString();

    if (this._cache.has(threadID)) {
      return this._cache.get(threadID);
    }

    const chats = await this._client.find(this._threadID, this._collection, new Query());
    const results = await Promise.all(chats.map(this._decrypt));

    this._cache.set(threadID, results);
    return results;
  }

  async post(to, message, attachments = []) {
    const encrypted = await this._encrypt(message, to);
    const params = { from: this._address, to, message: encrypted, attachments, date: new Date().toISOString() };
    await this._client.create(this._threadID, this._collection, [params]);
  }

  async listen(reply, err) {
    if (!err && reply?.collectionName === this._collection) {
      if ([reply?.instance?.from, reply?.instance.to].includes(this._address)) {
        const result = await this._decrypt(reply.instance);
        this._cache.set(result.from + result.to, result);
        return result;
      }
    }
  }

  //
  //////////////////////////////////////////////////////////////////////////////
  // PRIVATE METHODS
  //////////////////////////////////////////////////////////////////////////////
  //

  async _decrypt(chat) {
    const ceramic = await Utils.getInstance(Ceramic);

    try {
      chat.message = await ceramic.decrypt(chat.message);
    } catch (err) {}

    return chat;
  }

  async _encrypt(payload, to) {
    const ceramic = await Utils.getInstance(Ceramic);
    return await ceramic.encrypt(payload, to);
  }
}

export default Chat;

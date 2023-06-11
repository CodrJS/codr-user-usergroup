import { MongoManager, Types } from "@codrjs/mongo";

const Mongo = new MongoManager([
  {
    name: Types.DatabaseEnum.USER,
    models: [Types.UserModelEnum.USERGROUP],
  },
]);

export default Mongo;

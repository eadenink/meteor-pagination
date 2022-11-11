import defaults from "lodash.defaults";
import pullall from "lodash.pullall";

const getParams = (params = {}) => {
  const defaultParams = {
    limit: 10,
    sort: false,
    skip: 0,
    cursorSelector: {},
    page: 1,

    // From
    // https://docs.meteor.com/api/collections.html#Mongo-Collection-find
    reactive: true,
    fields: { _id: 1 },
    transform: undefined,
    disableOplog: false,
    pollingIntervalMs: 10000,
    pollingThrottleMs: 10000,
    maxTimeMs: undefined,
    hint: undefined,
    readPreference: undefined,
  };

  const unsupportedParams = pullall(
    Object.keys(params),
    Object.keys(defaultParams)
  );

  if (unsupportedParams?.length) {
    console.warn(
      'Meteor-pagination: you are passing params, which are not supported by the package, probably need to move them to "cursorQuery"'
    );
    console.log("Unsupported params:", unsupportedParams);
  }

  // Merge default params with passed ones
  const finalParams = defaults(params, defaultParams);

  // console.dir(finalParams, { depth: null });

  return finalParams;
};

export default getParams;
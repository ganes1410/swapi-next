const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

// Default expo config to merge
const defaultExpoConfig = getDefaultConfig(__dirname);

// Enable access to `lib` top level directorh
const customConfig = {
  resolver: {
    extraNodeModules: new Proxy(
      {
        "@swapi/lib": path.resolve(__dirname, "../lib"),
      },
      {
        get: (defaultExtraModules, importedModule) => {
          // Designated parent directories
          if (defaultExtraModules[importedModule]) {
            return defaultExtraModules[importedModule];
          }

          // Parent directory file node module imports
          return path.join(process.cwd(), `../node_modules/${importedModule}`);
        },
      }
    ),
  },
  projectRoot: path.resolve(__dirname),
  watchFolders: [
    path.resolve(__dirname, "../lib"),
    path.resolve(__dirname, "../node_modules"),
  ],
};

module.exports = {
  ...defaultExpoConfig,
  ...customConfig,
};

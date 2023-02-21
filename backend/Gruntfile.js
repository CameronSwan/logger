module.exports = function (grunt) {
  const sass = require("node-sass");

  require("load-grunt-tasks")(grunt);
  grunt.initConfig({
    sass: {
      options: {
        implementation: sass,
        sourceMap: false,
      },
      dist: {
        options: {
          style: "compressed",
        },
        files: {
          "../frontend/src/css/style.css": "scss/style.scss",
        },
      },
    },
    watch: {
      sass: {
        files: ["scss/**/*.scss"],
        tasks: ["sass:dist"],
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["watch"])
  grunt.registerTask("build", ["sass:dist"]);
};

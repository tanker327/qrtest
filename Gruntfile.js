module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"), // Assumes you have a package.json

        copy: {
            html: {
                src: "index.html",
                dest: "dist/index.tmp.html", // Temporary file for inlining
            },
        },

        uglify: {
            options: {
                mangle: true,
                compress: true,
            },
            main_script: {
                files: {
                    "dist/index.js": ["index.js"],
                },
            },
        },

        inline: {
            dist: {
                options: {
                    tag: "", // Process all script tags without a special attribute
                },
                src: "dist/index.tmp.html",
                dest: "dist/index.inlined.html", // Temporary file before final minification
            },
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true, // Be a bit more careful with collapsing
                    minifyJS: false, // JS is already minified by uglify and inlined
                    minifyCSS: true, // If you had CSS to inline and minify
                },
                files: {
                    "dist/index.html": "dist/index.inlined.html",
                },
            },
        },

        // Clean task configuration
        clean: {
            tmp_files: [
                "dist/index.tmp.html",
                "dist/index.inlined.html",
                "dist/index.js",
            ],
        },
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-inline");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-clean"); // Load the clean task

    // Define the default task, add clean to the end
    grunt.registerTask("default", [
        "copy:html",
        "uglify",
        "inline",
        "htmlmin",
        "clean",
    ]);
};

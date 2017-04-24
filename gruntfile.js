'use strict';

module.exports = function (grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ['dist/**/*'],

        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    compass: true,
                    sourcemap: 'none'

                },
                files: [{
                    expand: true,
                    cwd: 'src/styles',
                    src: ['*.scss'],
                    dest: 'src/styles',
                    ext: '.css'
                }]
            },
            prod: {
                options: {
                    style: 'compressed',
                    compass: true,
                    sourcemap: 'none'

                },
                files: [{
                    expand: true,
                    cwd: 'src/styles',
                    src: ['*.scss'],
                    dest: 'dist/styles',
                    ext: '.min.css'
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: ["last 2 versions"]
            },
            files: {
                "src/styles/main.css": ["src/styles/main.css"]
            }
        },
        concat: {
            dev: {
                src: ['src/scripts/main/*.js'],
                dest: 'src/scripts/main.js'
            },
            prod: {
                src: ['src/libs/main/*.js'],
                dest: 'src/libs/libs.js'
            }
        },
        uglify: {
            main: {
                src: ['src/scripts/*.js'],
                dest: 'dist/scripts/main.min.js'
            },
            libs: {
                src: ['src/libs/*.js'],
                dest: 'dist/libs/libs.min.js'
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['src/*.html', '*.html'],
                    dest: 'dist'
                }]
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images/'
                }]
            }
        },
        watch: {
            sass: {
                files: 'src/styles/**/*.scss',
                tasks: ['sass:dev', 'autoprefixer']
            },
            scripts: {
                files: ['src/scripts/main/*.js', 'src/libs/main/*.js'],
                tasks: ['concat', 'jshint']
            },
            html: {
                files: [
                    'src/*.html'
                ]
            }
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    src: [
                        "src/fonts/**/*.{ttf, otf, svg, woff, woff2}"
                    ],
                    dest: "dist/"
                }]
            }
        }

    });


    grunt.registerTask('dev', ['watch', 'sass:dev', 'concat']);

    grunt.registerTask('default', ['clean', 'sass:prod', 'uglify', 'htmlmin', 'imagemin', 'copy']);


};
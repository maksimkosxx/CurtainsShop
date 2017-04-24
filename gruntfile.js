'use strict';

module.exports = function (grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    compass: true
                },
                files: {
                    'src/styles/main.scss': 'main.css'
                }
            },
            prod: {
                options: {
                    style: 'compressed',
                    compass: true
                },
                files: [{
                    cwd: 'src/styles',
                    src: ['*.scss'],
                    dest: 'dist/styles',
                    ext: '.min.css'
                }]
            }
        },

        autoprefixer: {
            dist: {
                files: {
                    'src/styles/*.css': 'main.css'
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            libs: {
                src: 'src/libs/main/*.js',
                dest: 'dist/libs.min.js'
            },
            main: {
                src: [
                    'src/scripts/main/*.js'
                ],
                dest: 'src/scripts/main.js'
            }
        },
        uglify: {
            build: {
                src: 'src/scripts/main.js',
                dest: 'dist/scripts/main.min.js'
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },

            main: [
                'src/scripts/**/*.js'
            ]
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
            options: {
                // spawn: false,
                // livereload: true
            },
            scripts: {
                files: [
                    'src/scripts/**/*.js'
                ],
                tasks: [
                    'concat',
                    'jshint'
                ]
            },
            styles: {
                files: [
                    'src/styles/**/**/*.scss'
                ],
                tasks: [
                    'sass:dev'
                ]
            },
            html: {
                files: [
                    'src/*.html'
                ]
            }
        },
        clean: {
            build: {
                src: ['dist/**/*']
            }
        }

    });
    // copy: {
    //     build: {
    //         files: [{
    //             expand: true,
    //             src: [
    //                 "fonts/**/*.{woff, woff2}",
    //                 "img/**",
    //                 "js/**",
    //                 "*.html"
    //             ],
    //             dest: "build"
    //         }]
    //     }
    // },

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    require('load-grunt-config')(grunt);


    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале


    grunt.registerTask('default', ['sass:prod', 'autoprefixer', 'concat', 'uglify', 'jshint', 'imagemin']);


};
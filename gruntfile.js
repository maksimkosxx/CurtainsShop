'use strict';

module.exports = function (grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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
                tasks: ['concat']
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

    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале


    grunt.registerTask('dev', ['watch', 'sass:dev', 'concat']);


    grunt.registerTask('default', ['sass:prod', 'concat', 'uglify', 'imagemin']);


};
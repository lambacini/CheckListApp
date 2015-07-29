/**
 * Created by Mustafa on 29.07.2015.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            shortPathTest: ['dist/*.*', '!dist/libs']
        },
        concat: {
            css: {
                src: ['./app/css/*.css'],
                dest: 'dist/css/app.css',

            },
            appJs: {
                src: './app/js/app.js',
                dest: './dist/js/app.js'
            },
            ctrlJs:{
                src: './app/js/Controllers/*.js',
                dest: './dist/js/controllers.js'
            }
        },
        cssmin: {
            css: {
                src: './dist/css/app.css',
                dest: './dist/css/app.css'
            }
        },
        copy: {
            libs: {
                files: [{
                    expand: true,
                    cwd: './app/libs',
                    src: ['**'],
                    dest: './dist/libs/'
                }]
            },
            icons: {
                files: [{
                    expand: true,
                    cwd: 'app/images',
                    src: ['**'],
                    dest: './dist/images'
                }]
            },
            main: {
                files: [{
                    expand: true,
                    cwd: './app/3Party',
                    src: ['**'],
                    dest: './dist/3Party/'
                }, {
                    expand: true,
                    cwd: 'app/Views',
                    src: ['**'],
                    dest: './dist/views'
                }, {
                    expand: true,
                    cwd: 'app/',
                    src: ['index.html'],
                    dest: './dist'
                }, {
                    expand: true,
                    cwd: 'app/images',
                    src: ['**'],
                    dest: './dist/images'
                }],
            },
        },
        uglify: {
            my_target: {
                files: {
                    'dist/js/app.js': ['dist/js/app.js']
                }
            }
        },
        ngmin: {
            controllers: {
                src: ['dist/js/app.js'],
                dest: 'dist/js/app.js'
            }
        },
        connect: {
            server: {
                options: {
                    port: 9997,
                    base: './dist/',
                    livereload: 35729
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['app/js/**', 'app/css/*.css', 'app/**/*.html', 'app/3Party/*.js'],
                tasks: ['copy:main', 'concat', 'cssmin']
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ngmin');

    grunt.registerTask('default', ['clean', 'copy:main', 'copy:icons', 'concat', 'cssmin', 'ngmin', 'connect:server', 'watch']);

};

const path = require('path')
const clientlintpath = path.resolve(__dirname, './src/client/**/*.js')
const serverlintpath = path.resolve(__dirname, './src/server/**/*.js')

module.exports = function (grunt) {
  'use strict'
  //  Project configuration
  grunt.initConfig({
    babel: {
      server: {
        files: [
          { expand: true, cwd: './src/server', src: '**/*.js', dest: './dist/server', ext: '.js' }
        ]
      }
    },
    eslint: {
      client: {
        options: {
          format: 'node_modules/eslint-formatter-pretty'
        },
        src: [clientlintpath]
      },
      server: {
        options: {
          format: 'node_modules/eslint-formatter-pretty'
        },
        src: [serverlintpath]
      }
    },
    copy: {
      proistaclientresources: {
        files: [
          { expand: true, cwd: 'node_modules/@proista/client/lib/Resources/js/', src: ['**'], dest: './dist/content/js/' },
          { expand: true, cwd: 'node_modules/@proista/client/lib/Resources/css/', src: ['**'], dest: './dist/content/css/' }
        ]
      }
    },
    nodemon: {
      server: {
        script: './dist/server/server.js',
        options: {
          env: {
            PORT: '3002',
            NODE_ENV: 'development'
          },
          // omit this property if you aren't serving HTML files and
          // don't want to open a browser tab on start
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour)
            })
          },
          watch: ['./dist/server/'],
          delay: 5000
        }
      }
    },
    clean: {
      dist: ['./dist/*']
    }
  })

  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-eslint')
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-exec')

  // setup tasks
  grunt.registerTask('start', 'Start debugging', function () {
    grunt.task.run('prep')
    grunt.task.run('check')
    grunt.task.run('build')
    grunt.task.run('debug')
  })
  grunt.registerTask('prep', ['clean:dist'])
  grunt.registerTask('debug', ['nodemon:server'])
  grunt.registerTask('check', ['eslint:client', 'eslint:server'])
  grunt.registerTask('build', ['babel:server'])
}

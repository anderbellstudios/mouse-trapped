# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

task :server do
  sh "SECRET_KEY_BASE=$(bin/rake secret) RAILS_SERVE_STATIC_FILES=true bin/rails s -e production"
end

# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'
require_relative 'config/environment'

Rails.application.load_tasks

task :server do
  sh "SECRET_KEY_BASE=$(bin/rake secret) RAILS_SERVE_STATIC_FILES=true bin/rails s -e production"
end

class MailProtocol
  def initialize &block
    @block = block
  end

  def run
    @block.()
  end
end

task :mail do
  require 'tty-prompt'
  prompt = TTY::Prompt.new

  protocol = prompt.select("Which email do you want to distribute?") do |q|
    q.choices [
      { 
        name: 'new level', 
        value: MailProtocol.new {
          level = prompt.ask("Which level do you want to announce?") do |q|
            q.validate /^(?:\d|[a-f]){2}$/
            q.required true
          end

          NewLevelHelper.notify_users level
        } 
      }, 
      { 
        name: 'awareness', 
        value: MailProtocol.new {
          Subscription.deliver_email :awareness_email
        } 
      } 
    ]
  end

  n = Subscription.count
  is_happy = prompt.yes?("Are you sure you want to send this email to #{n} people?")
  if is_happy
    protocol.run
  else
    prompt.error("Abort.")
  end
end

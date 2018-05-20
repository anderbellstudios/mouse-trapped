# Preview all emails at http://localhost:3000/rails/mailers/subscription_mailer
class SubscriptionMailerPreview < ActionMailer::Preview
  def welcome
    SubscriptionMailer.welcome_email(Subscription.first)
  end

  def new_level
    SubscriptionMailer.new_level_email(Subscription.first, LevelCode.first)
  end
end

class SubscriptionMailer < ApplicationMailer
  def welcome_email(subscription)
    @subscription = subscription
    mail(to: @subscription.email, subject: "You're subscribed to Mouse Trapped updates")
  end
end

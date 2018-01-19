class SubscriptionMailer < ApplicationMailer
  def welcome_email(subscription)
    @subscription = subscription
    @url = "#{Figaro.env.server_domain}unsubscribe/#{@subscription.id}?security_hash=#{@subscription.security_hash}"
    mail(to: @subscription.email, subject: "You're subscribed to Mouse Trapped updates")
  end
end

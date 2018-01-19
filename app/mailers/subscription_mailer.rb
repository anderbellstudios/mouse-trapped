class SubscriptionMailer < ApplicationMailer
  def welcome_email(subscription)
    @subscription = subscription
    set_unsubscribe_url
    mail(to: @subscription.email, subject: "You're subscribed to Mouse Trapped updates")
  end

  def new_level_email(subscription)
    @subscription = subscription
    set_unsubscribe_url
    mail(to: @subscription.email, subject: "We've got a new level for you. Come and play!")
  end

  private 
    def set_unsubscribe_url
      @unsubscribe_url = "#{Figaro.env.server_domain}unsubscribe/#{@subscription.id}?security_hash=#{@subscription.security_hash}"
    end
end

class SubscriptionMailer < ApplicationMailer
  def welcome_email(subscription)
    @subscription = subscription
    set_unsubscribe_url
    mail(to: @subscription.email, subject: "You're subscribed to Mouse Trapped updates")
  end

  def new_level_email(subscription, invitation)
    @subscription = subscription
    @invitation = invitation
    set_unsubscribe_url
    mail(to: @subscription.email, subject: "We've got a new level for you. Come and play!")
  end

  def awareness_email(subscription)
    @subscription = subscription
    set_unsubscribe_url
    mail(to: @subscription.email, subject: "Help to spread the word about Mouse Trapped")
  end

  def application_submitted_email(subscription)
    @subscription = subscription
    set_unsubscribe_url
    mail(to: @subscription.email, subject: "We've submitted our application to the Young Game Designers competition")
  end

  def invitation_accepted_email(subscription, level_code)
    @subscription = subscription
    @level_code = level_code
    set_unsubscribe_url
    mail(to: @subscription.email, subject: "You introduced a new player to Mouse Trapped")
  end

  private 
    def set_unsubscribe_url
      @unsubscribe_url = "#{Figaro.env.server_domain}unsubscribe/#{@subscription.id}?security_hash=#{@subscription.security_hash}"
    end
end

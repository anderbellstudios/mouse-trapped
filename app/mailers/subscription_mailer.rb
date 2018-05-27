class SubscriptionMailer < ApplicationMailer
  def welcome_email(subscription)
    @subscription = subscription
    set_unsubscribe_url
    mail(to: @subscription.email, subject: "You're subscribed to Mouse Trapped updates")
  end

  def new_level_email(subscription, level_code)
    @subscription = subscription
    @level_code = level_code 
    set_unsubscribe_url
    mail(to: @subscription.email, subject: "We've got a new level for you. Come and play!")
  end

  def generic_email(subscription, subject, body)
    @subscription = subscription
    @subject = subject
    @body = body 
    @html_body = markdown(body)
    set_unsubscribe_url
    mail(to: @subscription.email, subject: subject)
  end

  private 
    def set_unsubscribe_url
      @unsubscribe_url = "#{Figaro.env.server_domain}unsubscribe/#{@subscription.id}?security_hash=#{@subscription.security_hash}"
    end

    def markdown(text)
      options = {
        filter_html:     true,
        hard_wrap:       true,
        link_attributes: { rel: 'nofollow', target: "_blank" },
        space_after_headers: true,
        fenced_code_blocks: true
      }

      extensions = {
        autolink:           true,
        superscript:        true,
        disable_indented_code_blocks: true
      }

      renderer = Redcarpet::Render::HTML.new(options)
      markdown = Redcarpet::Markdown.new(renderer, extensions)

      markdown.render(text).html_safe
    end
end

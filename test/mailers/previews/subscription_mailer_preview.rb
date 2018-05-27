# Preview all emails at http://localhost:3000/rails/mailers/subscription_mailer
class SubscriptionMailerPreview < ActionMailer::Preview
  def welcome
    SubscriptionMailer.welcome_email(Subscription.first)
  end

  def new_level
    SubscriptionMailer.new_level_email(Subscription.first, LevelCode.first)
  end

  def generic_email
    SubscriptionMailer.generic_email(Subscription.first, "This is the subject field!", %{
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at nisl ipsum. Fusce vehicula sem vitae libero convallis dictum. Pellentesque ultrices est non sodales pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque tortor id suscipit mollis. Praesent venenatis ultrices felis in posuere. Curabitur luctus nibh sed urna tincidunt, pretium egestas neque congue. Nulla posuere turpis a accumsan condimentum. Quisque rutrum dignissim ultricies.

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In aliquet nulla a gravida finibus. Nulla fringilla lacus eu dui tristique, porta aliquet felis bibendum. Quisque venenatis faucibus nisi, vitae vehicula magna iaculis nec. Ut justo urna, viverra at risus eget, aliquet malesuada est. Duis at lacinia neque. Etiam vitae lectus eget sem iaculis suscipit eget vel tellus. Suspendisse potenti. Sed eleifend orci erat, sed lacinia nulla scelerisque ut. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
})
  end
end

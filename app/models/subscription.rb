class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
      record.errors[attribute] << (options[:message] || "is not an email")
    end
  end
end

class Subscription < ApplicationRecord
  validates :email, presence: true, email: true, uniqueness: true
  def self.deliver_email(email, *args)
    Subscription.all.each do |sub|
      sub.deliver_email(email, *args)
    end
  end

  def deliver_email(email, *args)
      SubscriptionMailer.send(email, self, *args).deliver_later
  end
end

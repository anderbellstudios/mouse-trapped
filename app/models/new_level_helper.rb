module NewLevelHelper
  def self.notify_users level
    Subscription.all.each do |subscription|
      invitation = InvitationCode.create_invitation_for subscription, level
      subscription.deliver_email :new_level_email, invitation
    end
  end
end

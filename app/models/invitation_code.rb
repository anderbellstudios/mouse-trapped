class InvitationCode < ApplicationRecord
  belongs_to :subscription

  def self.received_code code
    invitation = find_invitation_for code
    return if invitation.nil? or invitation.used?

    LevelCode.distribute_for invitation
    invitation.used = true
    invitation.save
  end

  def self.create_invitation_for subscription, level
    InvitationCode.create subscription: subscription, code: CodeGenerator.code, level: level
  end

  def self.find_invitation_for code
    InvitationCode.find_by code: code.downcase.strip
  end
end

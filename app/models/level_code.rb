class LevelCode < ApplicationRecord
  def self.distribute_for invitation
    level_code = LevelCode.create level: invitation.level, code: CodeGenerator.code
    invitation.subscription.deliver_email :invitation_accepted_email, level_code
  end

  def self.find_level_for code
    LevelCode.find_by(code: code.downcase.strip)
  end
end

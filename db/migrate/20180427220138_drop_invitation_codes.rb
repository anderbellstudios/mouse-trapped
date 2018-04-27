class DropInvitationCodes < ActiveRecord::Migration[5.1]
  def change
    drop_table :invitation_codes
  end
end

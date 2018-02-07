class CreateInvitationCodes < ActiveRecord::Migration[5.1]
  def change
    create_table :invitation_codes do |t|
      t.boolean :used
      t.string :code
      t.string :level
      t.integer :subscription_id

      t.timestamps
    end
  end
end

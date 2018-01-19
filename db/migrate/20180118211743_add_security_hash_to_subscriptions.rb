class AddSecurityHashToSubscriptions < ActiveRecord::Migration[5.1]
  def change
    add_column :subscriptions, :security_hash, :string
  end
end

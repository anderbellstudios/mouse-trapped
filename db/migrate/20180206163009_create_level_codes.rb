class CreateLevelCodes < ActiveRecord::Migration[5.1]
  def change
    create_table :level_codes do |t|
      t.string :code
      t.string :level

      t.timestamps
    end
  end
end

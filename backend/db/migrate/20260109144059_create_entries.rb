class CreateEntries < ActiveRecord::Migration[7.2]
  def change
    create_table :entries do |t|
      t.text :content
      t.integer :mood_score
      t.timestamps
    end
  end
end
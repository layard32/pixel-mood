class CreateEntries < ActiveRecord::Migration[7.2]
  def change
    create_table :entries do |t|
      t.text :content
      t.integer :mood_score
      t.datetime :entry_date
      t.timestamps
    end
      
      # indice unico su entry_date per garantire l'unicità
      add_index :entries, :entry_date, unique: true
  end
end
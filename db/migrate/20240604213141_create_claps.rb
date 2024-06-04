class CreateClaps < ActiveRecord::Migration[7.0]
  def change
    create_table :claps do |t|
      t.integer :amount, null: false
      t.references :clappable, polymorphic: true, null: false
      t.references :clapper, null: false

      t.timestamps
    end
    add_index :claps, [:clapper_id, :clappable_id, :clappable_type], unique: true
  end
end

class CreateRelationships < ActiveRecord::Migration
  def change
  	create_table :relationships do |t|
  		t.references :user
  		t.references :survey
  		t.timestamps
  	end
  end
end

class CreateChoices < ActiveRecord::Migration
  def change
  	create_table :choices do |t|
  		t.string :content
  		t.references :question
  		t.integer :tally
  	end
  end
end

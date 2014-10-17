class CreateQuestions < ActiveRecord::Migration
  def change
  	create_table :questions do |t|
  		t.string :text
  		t.references :survey
  	end
  end
end

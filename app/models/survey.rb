class Survey < ActiveRecord::Base
	validates_presence_of :title, :description
  has_many :questions
  has_many :relationships
  has_many :users, through: :relationships
end

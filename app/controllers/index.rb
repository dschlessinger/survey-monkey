get '/' do
	@surveys = Survey.all
	unless params[:updated_at] == nil
		@notes = @notes.order("updated_at #{params[:updated_at]}").reverse
	end
	erb :index
end

get '/survey/new' do
	erb :new_survey
end

# post '/note' do
# 	@note = Note.create(params)
# 	redirect "/note/#{@note.id}"
# end

# get '/note/:id' do
# 	@note = Note.find(params[:id])
# 	erb :show_note
# end

# get '/note/:id/edit' do
# 	@note = Note.find(params[:id])
# 	erb :edit_note
# end

# put '/note/:id' do
# 	@note = Note.find(params[:id])
# 	@note.assign_attributes({
# 	  title: params[:title],
# 	  content: params[:content],
# 	  updated_at: params[:updated_at],
# 	  author: params[:author]
# 	  })
# 	@note.save
# 	redirect "/note/#{@note.id}"
# end

# get '/note/:id/delete' do
# 	@note = Note.find(params[:id])
# 	@note.destroy!
# 	redirect '/'
# end

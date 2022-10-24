export default class gotService {
	constructor(){
		this._apiBase = 'https://anapioficeandfire.com/api'
	}

	async getResource( url ){
		const res = await fetch( `${ this._apiBase + url }` )

		if( ! res.ok ) throw new Error( `Couldn't fetch ${ url }, received ${ res.status }` )

		return await res.json()
	}

	getAllCharacters = async () => {
		const characters = await this.getResource( `/characters?page=5&pageSize=10` )

		return characters.map( this._transformCharacter )
	}

	getCharacter = async id => {
		const character = await this.getResource( `/characters/${ id }` )

		return this._transformCharacter( character )
	}

	getAllHouses = async () => {
		const houses = await this.getResource( '/houses' )

		return houses.map( this._transformHouse )
	}

	getHouse = async id => {
		const house = await this.getResource( `/houses/${ id }` )

		return this._transformHouse( house )
	}

	getAllBooks = async () => {
		const books = await this.getResource( '/books' )

		return books.map( this._transformBook )
	}

	getBook = async id => {
		const book = await this.getResource( `/books/${ id }` )

		return this._transformBook( book )
	}

	_extractId = item => {
		const idRegExp = /\/([0-9]*)$/

		return item.url.match( idRegExp )[1]
	}

	isSet = data => data || '---'

	_transformCharacter = character => {
		return {
			id		: this._extractId( character ),
			name	: this.isSet( character.name ),
			gender	: this.isSet( character.gender ),
			born	: this.isSet( character.born ),
			died	: this.isSet( character.died ),
			culture	: this.isSet( character.culture )
		}
	}

	_transformHouse = house => {
		return {
			id				: this._extractId( house ),
			name			: this.isSet( house.name ),
			region			: this.isSet( house.region ),
			words			: this.isSet( house.words ),
			titles			: this.isSet( house.titles ),
			overlord		: this.isSet( house.overlord ),
			ancestralWeapons: this.isSet( house.ancestralWeapons )
		}
	}

	_transformBook = book => {
		return {
			id				: this._extractId( book ),
			name			: this.isSet( book.name ),
			numberOfPages	: this.isSet( book.numberOfPages ),
			publisher		: this.isSet( book.publisher ),
			released		: this.isSet( book.released )
		}
	}
}
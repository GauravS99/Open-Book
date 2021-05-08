import React, { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import difflib from '../../jsdifflib/difflib';
import diffview from '../../jsdifflib/diffview';
import '../../jsdifflib/diffview.css';
import Edit from '../../models/Edit';
import EditService from '../../services/db/editService';
import { BookHeaderState } from './Book';
import BookActionHeader, { } from './BookActionHeader';

interface PropTypes {
    
}

const useFetchEdit = (editId: string): Edit | undefined => {
	const [edit, setEdit] = useState<Edit | undefined>(undefined);

	const fetchEdit = async () => {
		const edit = await EditService.getEdit(editId);
		setEdit(edit);
	};

	useEffect(() => { fetchEdit(); });

	return edit;
};


const diffUsingJS = (original: string, edit: string) => {

	const base = difflib.stringAsLines(original),
		newtxt = difflib.stringAsLines(edit),
		sm = new difflib.SequenceMatcher(base, newtxt),
		opcodes = sm.get_opcodes(),
		diffoutputdiv = document.getElementById('diffOutput') as any;

	diffoutputdiv.innerHTML = '';
	const contextSize =  null;
  
	diffoutputdiv.appendChild(diffview.buildView({
		baseTextLines: base,
		newTextLines: newtxt,
		opcodes: opcodes,
		baseTextName: 'Base Text',
		newTextName: 'New Text',
		contextSize: contextSize,
		viewType: 1
	}));
};

const BookEdit = (props: PropTypes) : JSX.Element => {
    // @ts-ignore
	const { id } = useParams();
    const edit = useFetchEdit(id);

    useEffect(() => {
        if(edit){
            diffUsingJS(edit.previous_story, edit.new_story);
        }
    }, [edit]);

    return (
        <div className="content bg-colour-2 colour-4 h-100 p-3 rounded">
            <div>
                <BookActionHeader state={BookHeaderState.EditView} />
            </div>
            <div className="bg-color-5">
                <div id="diffOutput"/>
            </div>
        </div>
    );
};

export default BookEdit;
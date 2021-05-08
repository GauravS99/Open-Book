import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import difflib from '../../jsdifflib/difflib';
import diffview from '../../jsdifflib/diffview';
import '../../jsdifflib/diffview.css';
import { BookHeaderState } from './Book';
import BookActionHeader from './BookActionHeader';

interface PropTypes {
    
}

function diffUsingJS() {
	const byId = function (id: any) { return document.getElementById(id); },
		base = difflib.stringAsLines('adioawdawdhoahdoahdoawa\nihdhoawhdadh\noiadwjdaiwjd\naiwdowaid'),
		newtxt = difflib.stringAsLines('adioawdawdhoahdoahdoawaihdhoawhdadh\noiasjdaiwjd\naiwdowaid'),
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
}

const BookEdit = (props: PropTypes) : JSX.Element => {

    // @ts-ignore
	const { id } = useParams();

    useEffect(() => {
        diffUsingJS();
    });

    return (
        <div className="content bg-colour-2 colour-4 h-100 p-3 rounded">
            <div>
                <BookActionHeader />
            </div>
            <div className="bg-color-5">

            </div>
        </div>
    );
};

export default BookEdit;
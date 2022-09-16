import React, {useState} from 'react';
import PopUp from '@components/PopUp';
import styled from 'styled-components';

const test4 = () => {
	const [estadoModal1, cambiarEstadoModal1] = useState(false);

	return (
		<div>
			<ContenedorBotones>
				<Boton onClick={() => cambiarEstadoModal1(!estadoModal1)}>Modal 1</Boton>				
			</ContenedorBotones>

			{/* Modal #1 */}
			<PopUp
				estado={estadoModal1}
				cambiarEstado={cambiarEstadoModal1}
				titulo="Hola!"
				mostrarHeader={true}
				mostrarOverlay={true}
				posicionModal={'center'}
				padding={'20px'}
			>
				<Contenido>
					<h1>Ventana Modal</h1>
					<p>Reutilizable y con opciones de personalización.</p>	
					<Boton onClick={() => cambiarEstadoModal1(!estadoModal1)}>Aceptar</Boton>
				</Contenido>
			</PopUp>
		</div>
	);
}
 
export default test4;

const ContenedorBotones = styled.div`
	padding: 40px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;
`;

const Boton = styled.button`
	display: block;
	padding: 10px 30px;
	border-radius: 100px;
	color: #fff;
	border: none;
	background: #1766DC;
	cursor: pointer;
	font-family: 'Roboto', sans-serif;
	font-weight: 500;
	transition: .3s ease all;

	&:hover {
		background: #0066FF;
	}
`;

const Contenido = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		font-size: 42px;
		font-weight: 700;
		margin-bottom: 10px;
	}

	p {
		font-size: 18px;
		margin-bottom: 20px;
	}

	img {
		width: 100%;
		vertical-align: top;
		border-radius: 3px;
	}
`;
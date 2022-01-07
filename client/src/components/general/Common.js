import React from 'react';
import styled from 'styled-components';
import { ButtonLoader } from './Loaders'
import { ERROR, GREY_LIGHTEST, GREY_MEDIUM_DARK, PRIMARY, BG_PRIMARY, PRIMARY_DARK, SHADOW_MEDIUM, MAX_DESKTOP_WIDTH, BG_LIGHTER, SHADOW_LIGHT } from '../../cssVars';
import backImg from '../../assets/back.svg'

export const ButtonContent = styled.button`
  background-color: ${({ secondary, color }) => secondary ? 'none' : (color || PRIMARY)};
  color: ${({ fontColor, secondary, isLoading, color }) => fontColor ? fontColor : (secondary || isLoading) ? (color || PRIMARY) : '#fff'};
  font-weight: 700;
  font-size: ${({ prominent }) => prominent ? 21 : 18}px;
  box-shadow: ${({ secondary }) => secondary ? 'none' : '0 2px 8px rgba(0,0,0,.11)'};
  padding: 10px 25px;
  min-width: ${({ wide }) => wide ? '100%' : '250px'};
  text-align: center;
  border: ${({ secondary, color }) => secondary ? `1px solid ${color || PRIMARY}` : 'none'};
  border-radius: 4px;
  opacity: ${({ disabled, isLoading }) => (disabled || isLoading) ? 0.5 : 1};
  transition: all 0.2s ease;
  cursor: ${({ disabled, isLoading }) => (disabled || isLoading) ? 'default' : 'pointer'};
  &:focus {
    box-shadow: 0 0 2px 4px rgb(93, 196, 255);
  }
  @media only screen and (max-width: ${MAX_DESKTOP_WIDTH}px) {
    ${({ fillOnMobile }) => fillOnMobile ? 'width: min(100%, 400px);' : ''};
  } 
`;

export const TableButtonContent = styled(ButtonContent)`
  background-color: ${({ color }) => color || PRIMARY};
  &:hover {
    background-color: ${({ color }) => color || PRIMARY_DARK};
  }
`;


export const InvertedButtonContent = styled.button`
  color: ${({ active, primary }) => active ? '#fff' : (primary || PRIMARY)};
  font-size: 18px;
  font-weight: 700;
  padding: 8px 12px;
  position: relative;
  margin-right: 10px;
  margin-bottom: 10px;
  min-width: 150px;
  text-align: center;
  background-color: ${({ active, primary }) => active ? (primary || PRIMARY) : BG_LIGHTER};
  border: 2px solid ${({primary}) => primary || PRIMARY};
  border-radius: 4px;
  transition: all 0.2s ease;
  box-shadow: ${SHADOW_LIGHT};
  @media only screen and (max-width: ${MAX_DESKTOP_WIDTH}px) {
    ${({ fillOnMobile }) => fillOnMobile ? 'width: min(100%, 400px);' : ''};
  } 
`;

export const ButtonWrapper = styled.div`
  position: relative;
  display: ${({ wide }) => wide ? 'block' : 'inline-block'};
  cursor: ${({ disabled, isLoading }) => (disabled || isLoading) ? 'default' : 'pointer'};
`;

export const InvertedButton = ({ isLoading, disabled, onClick, wrapperStyle, ...props }) => {
  const handleClick = () => {
    onClick();
  }
  return (
    <ButtonWrapper style={wrapperStyle} onClick={isLoading ? null : handleClick} disabled={disabled} isLoading={isLoading}>
      {isLoading && <ButtonLoader />}
      <InvertedButtonContent primary={PRIMARY} {...props} disabled={disabled} isLoading={isLoading} />
    </ButtonWrapper>
  )
}

export const Button = ({ isLoading, disabled, onClick, wide, wrapperStyle, prominent, ...props }) => {
  const handleClick = () => {
    if (!isLoading) {
      onClick();
    }
  }
  return (
    <ButtonWrapper style={wrapperStyle} wide={wide} onClick={handleClick} disabled={disabled} isLoading={isLoading}>
      {isLoading && <ButtonLoader />}
      <ButtonContent color={PRIMARY} {...props} wide={wide} disabled={disabled} prominent={prominent} isLoading={isLoading} />
    </ButtonWrapper>
  );
}

export const StatefulButton = ({ disabled, onClick, wide, wrapperStyle, style, active, children, id, ...props }) => {
  return (
    <ButtonWrapper id={id} style={wrapperStyle}  wide={wide} onClick={onClick} disabled={disabled}>
      <InvertedButtonContent primary={PRIMARY} {...props} style={style} active={active}>{children}</InvertedButtonContent>
    </ButtonWrapper>
  );
}

export const TableButton = ({ onClick, style, ...props }) => {
  return (
    <ButtonWrapper style={style} onClick={onClick}>
      <TableButtonContent {...props} />
    </ButtonWrapper>
  );
}

export const DeleteButton = (props) => {
  return <Button style={{ marginRight: 'auto', marginLeft: '0px' }} color={ERROR} {...props} />
}

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const MediumTile = styled.div`
  width: 350px;
  padding: 25px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: ${SHADOW_MEDIUM};
  @media only screen and (max-width: 760px) {
    max-width: 100%;
  }  
`;

export const CenteredTile = ({ children }) => (
  <CenteredWrapper>
    <MediumTile>
      {children}
    </MediumTile>
  </CenteredWrapper>
)

export const FieldWrapper = styled.div`
  margin: 10px 0px;
`;

export const FieldError = styled.div`
  font-size: 14px;
  color: ${ERROR};
`;

export const CircleIconWrapper = styled.div`
  border-radius: 100%;
  background-color: ${PRIMARY};
  background-color: ${PRIMARY};
  box-shadow: 0 1px 4px rgba(0,0,0,.11);
  height: 28px;
  width: 28px;
  cursor: pointer;
  margin: 0px auto;
  transition: all 0.2s ease;
  &:hover {
    background-color: ${PRIMARY_DARK};
  }
`;

export const CircleIcon = styled.img`
  height: 18px;
  width: 18px;
  margin: 5px;
`;

const StyledTable = styled.table`
  background-color: ${({color}) => color};
  padding: 10px;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
`

export const Table = ({children}) => {
  return <StyledTable color={BG_PRIMARY}>
    {children}
  </StyledTable>
}

const TableHeaderTH = styled.th`
  text-align: left;
  padding: 10px 0px;
  color: #094B8A;
  color: ${({color}) => color};
`

export const TableHeader = ({children}) => {
  return <TableHeaderTH color={PRIMARY_DARK}>
    {children}
  </TableHeaderTH>
}

export const TableRow = styled.tr`
  ${({ clickable }) => clickable ? `
    cursor: pointer;
    &:hover {
      > td {
        background-color: ${GREY_LIGHTEST};
      }
    }
  ` : ''}
`

export const TableData = styled.td`
  background-color: ${({ isEdit }) => isEdit ? GREY_MEDIUM_DARK : '#fff'};
  max-height: 100px;
  max-width: 250px;
  overflow: scroll;
  padding: 10px;
`

export const TableHeaderInner = styled.div`
  display: flex;
  align-items: center;
`;

export const TableTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  > div:first-child {
    margin-right: auto;
  }
  > div:last-child {
    margin-left: 10px;
  }
`;

export const StyledHR = styled.hr`
  border: 0px;
  border-top: 1px solid lightgrey;
  margin: ${({ margin }) => margin || '20px 0px'};
`

export const StyledLink = styled.a`
  cursor: pointer;
  word-wrap: break-word;
  display: inline-block;
  color: ${({ primary }) => primary || PRIMARY};
`;

// Screen reader only text to alert users that the link will open in a new tab
const ExternalLinkSRText = () => (
  <span className="visually-hidden">opens in new tab</span>
)

export const TextLink = ({ to, style, children }) => {
  return (
    <StyledLink primary={PRIMARY} style={style} target="_blank" rel="noreferrer noopener" href={to}>
      {children}
      <ExternalLinkSRText />
    </StyledLink>
  )
}

const ButtonWithLinkStyle = styled.button`
  background-color: transparent;
  color: ${({primary}) => primary || PRIMARY};
  text-decoration: underline;
  border: none;
  font-weight: 700;
  padding: 0px;
  margin: 0px;
`

export const LinkLikeButton = ({ onClick, style, children, analyticsName }) => {
  const handleClick = () => {
    onClick();
  }
  return <ButtonWithLinkStyle primary={PRIMARY} type="button" style={style} onClick={handleClick}>
      {children}
    </ButtonWithLinkStyle>
}

export const ButtonLinkContent = styled.a`
  color: ${({ active }) => active ? BG_PRIMARY : PRIMARY};
  font-size: 18px;
  font-weight: 700;
  padding: 8px 30px;
  position: relative;
  margin-bottom: 10px;
  min-width: 150px;
  text-align: center;
  background-color: ${({ active }) => active ? PRIMARY : BG_LIGHTER};
  border: 2px solid ${PRIMARY};
  border-radius: 4px;
  transition: all 0.2s ease;
  text-decoration: none;
  box-shadow: ${SHADOW_LIGHT};
  @media only screen and (max-width: ${MAX_DESKTOP_WIDTH}px) {
    ${({ fillOnMobile }) => fillOnMobile ? 'width: min(100%, 400px);' : ''};
  } 
`;

export const ButtonLikeLink = ({ wrapperStyle, to, children }) => {
  return <ButtonWrapper style={{ ...wrapperStyle, margin: '15px 0px'}}>
    <ButtonLinkContent target="_blank" rel="noreferrer noopener" href={to}>
      {children}
      <ExternalLinkSRText />
    </ButtonLinkContent>
  </ButtonWrapper>
}

const BackArrowImg = styled.img`
  width: 24px;
  height: 22px;
  padding: 10px;
  margin: -10px;
`

export const BackArrow = (props) => <BackArrowImg {...props} src={backImg} alt="back arrow to navigate to previous page" />

const BackArrowBtnBase = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  padding: 0px;
  &:focus {
    box-shadow: none;
  }
`

export const BackArrowButton = (props) => 
  <BackArrowBtnBase type="button" {...props}>
    <BackArrow />
  </BackArrowBtnBase>

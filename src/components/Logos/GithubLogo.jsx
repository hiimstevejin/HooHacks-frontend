import styles from './GithubLogo.module.css'

function GithubLogo() {
  return (
    <img 
    src="github-mark.png" 
    alt="GitHub Logo" 
    className={styles.githubLogo}
  />
  )
}

export default GithubLogo

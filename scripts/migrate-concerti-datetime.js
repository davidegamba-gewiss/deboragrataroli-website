#!/usr/bin/env node
/**
 * Migration Script: Merge data_evento + orario into single datetime field
 *
 * This script:
 * 1. Reads all concert files from content/concerti/
 * 2. Combines data_evento (YYYY-MM-DD) + orario (HH:mm) into data_evento (YYYY-MM-DDTHH:mm)
 * 3. Removes the orario field
 * 4. Writes the updated file back
 *
 * Usage: node scripts/migrate-concerti-datetime.js
 *
 * Safe to run multiple times (idempotent)
 */

const fs = require('fs');
const path = require('path');

const CONCERTI_DIR = path.join(process.cwd(), 'content', 'concerti');
const DEFAULT_TIME = '21:00'; // Default time if orario is missing

/**
 * Extract frontmatter value from raw content
 */
function extractField(content, fieldName) {
  // Match field: value (handling quoted and unquoted values)
  const regex = new RegExp(`^${fieldName}:\\s*["']?([^"'\\n]+?)["']?\\s*$`, 'm');
  const match = content.match(regex);
  return match ? match[1].trim() : null;
}

/**
 * Migrate a single concert file
 */
function migrateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already migrated (no orario field exists)
  const hasOrario = /^orario:/m.test(content);
  if (!hasOrario) {
    // Check if data_evento already has time component
    if (/data_evento:\s*["']?\d{4}-\d{2}-\d{2}T/.test(content)) {
      console.log(`✓  Already migrated: ${path.basename(filePath)}`);
      return true;
    }
  }

  // Extract date and time using regex
  const date = extractField(content, 'data_evento');
  const time = extractField(content, 'orario') || DEFAULT_TIME;

  if (!date) {
    console.warn(`⚠️  No data_evento in: ${filePath}`);
    return false;
  }

  // Combine into ISO datetime
  const datetime = `${date}T${time}`;

  // Replace data_evento value with datetime
  content = content.replace(
    /^(data_evento:\s*)["']?[^"'\n]+["']?\s*$/m,
    `$1${datetime}`
  );

  // Remove orario line completely (including any trailing newline)
  content = content.replace(/^orario:.*\n?/m, '');

  // Write back
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Migrated: ${path.basename(filePath)} -> ${datetime}`);

  return true;
}

/**
 * Main migration function
 */
function main() {
  console.log('🔄 Starting concert datetime migration...\n');

  if (!fs.existsSync(CONCERTI_DIR)) {
    console.error(`❌ Directory not found: ${CONCERTI_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(CONCERTI_DIR).filter(f => f.endsWith('.md'));

  console.log(`📁 Found ${files.length} concert files\n`);

  let migrated = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = path.join(CONCERTI_DIR, file);
    try {
      if (migrateFile(filePath)) {
        migrated++;
      } else {
        skipped++;
      }
    } catch (error) {
      console.error(`❌ Error migrating ${file}:`, error.message);
      failed++;
    }
  }

  console.log('\n📊 Migration Summary:');
  console.log(`   ✅ Migrated: ${migrated}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Failed: ${failed}`);

  if (failed > 0) {
    process.exit(1);
  }
}

main();
